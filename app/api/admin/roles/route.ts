import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Role from '@/schema/RoleSchema';
import User from '@/schema/UserSchema';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'roles.read')) {
      return NextResponse.json(permissionDeniedResponse('roles.read'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const isActive = searchParams.get('isActive');
    const includeAll = searchParams.get('includeAll') === 'true';
    
    const query: Record<string, unknown> = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (isActive !== null && isActive !== undefined && isActive !== '') {
      query.isActive = isActive === 'true';
    }

    if (includeAll) {
      const roles = await Role.find(query)
        .select('name description isActive')
        .sort({ name: 1 });
      
      return NextResponse.json({
        success: true,
        data: roles
      });
    }

    const skip = (page - 1) * limit;
    
    const roles = await Role.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'roleId',
          as: 'users'
        }
      },
      {
        $addFields: {
          userCount: { $size: '$users' }
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          permissions: 1,
          isActive: 1,
          isSystemRole: 1,
          createdAt: 1,
          updatedAt: 1,
          userCount: 1
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await Role.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: roles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'roles.create')) {
      return NextResponse.json(permissionDeniedResponse('roles.create'), { status: 403 });
    }

    await connectDB();
    
    const body = await request.json();
    const { name, description, permissions, isActive = true } = body;
    
    if (!name || !permissions || !Array.isArray(permissions)) {
      return NextResponse.json(
        { success: false, error: 'Name and permissions array are required' },
        { status: 400 }
      );
    }

    if (permissions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one permission is required' },
        { status: 400 }
      );
    }

    const existingRole = await Role.findOne({ name: name.trim() });
    if (existingRole) {
      return NextResponse.json(
        { success: false, error: 'Role name already exists' },
        { status: 400 }
      );
    }

    const validPermissions = [
      'dashboard.read',
      'events.read', 'events.create', 'events.update', 'events.delete',
      'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete',
      'certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete',
      'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
      'competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete',
      'users.read', 'users.create', 'users.update', 'users.delete',
      'roles.read', 'roles.create', 'roles.update', 'roles.delete'
    ];

    const invalidPermissions = permissions.filter((p: string) => !validPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid permissions: ${invalidPermissions.join(', ')}` },
        { status: 400 }
      );
    }

    const newRole = new Role({
      name: name.trim(),
      description: description?.trim() || '',
      permissions,
      isActive,
      isSystemRole: false,
      createdBy: session.user.id
    });

    await newRole.save();

    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Role created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create role' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'roles.update')) {
      return NextResponse.json(permissionDeniedResponse('roles.update'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('id');
    
    if (!roleId) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, permissions, isActive } = body;
    
    const role = await Role.findById(roleId);
    if (!role) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    if (role.isSystemRole && (name !== undefined || isActive === false)) {
      return NextResponse.json(
        { success: false, error: 'Cannot modify system role name or deactivate system roles' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    
    if (name !== undefined && !role.isSystemRole) {
      const existingRole = await Role.findOne({ 
        name: name.trim(),
        _id: { $ne: roleId }
      });
      if (existingRole) {
        return NextResponse.json(
          { success: false, error: 'Role name already exists' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }
    
    if (description !== undefined) {
      updateData.description = description.trim();
    }
    
    if (permissions !== undefined) {
      if (!Array.isArray(permissions) || permissions.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Permissions must be a non-empty array' },
          { status: 400 }
        );
      }
      
      const validPermissions = [
        'dashboard.read',
        'events.read', 'events.create', 'events.update', 'events.delete',
        'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete',
        'certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete',
        'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
        'competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete',
        'users.read', 'users.create', 'users.update', 'users.delete',
        'roles.read', 'roles.create', 'roles.update', 'roles.delete'
      ];

      const invalidPermissions = permissions.filter((p: string) => !validPermissions.includes(p));
      if (invalidPermissions.length > 0) {
        return NextResponse.json(
          { success: false, error: `Invalid permissions: ${invalidPermissions.join(', ')}` },
          { status: 400 }
        );
      }
      
      updateData.permissions = permissions;
    }
    
    if (isActive !== undefined && !role.isSystemRole) {
      updateData.isActive = isActive;
    }

    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedRole,
      message: 'Role updated successfully'
    });

  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update role' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'roles.delete')) {
      return NextResponse.json(permissionDeniedResponse('roles.delete'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('id');
    
    if (!roleId) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    if (role.isSystemRole) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete system roles' },
        { status: 400 }
      );
    }

    const usersWithRole = await User.countDocuments({ roleId: roleId });
    if (usersWithRole > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete role. ${usersWithRole} user(s) are assigned this role` },
        { status: 400 }
      );
    }

    await Role.findByIdAndDelete(roleId);

    return NextResponse.json({
      success: true,
      message: 'Role deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete role' },
      { status: 500 }
    );
  }
}