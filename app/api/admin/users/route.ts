import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import User from '@/schema/UserSchema';
import Role from '@/schema/RoleSchema';
import bcrypt from 'bcrypt';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'users.read')) {
      return NextResponse.json(permissionDeniedResponse('users.read'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const roleId = searchParams.get('roleId') || '';
    const isActive = searchParams.get('isActive');
    
    const query: Record<string, unknown> = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (roleId) {
      query.roleId = roleId;
    }
    
    if (isActive !== null && isActive !== undefined && isActive !== '') {
      query.isActive = isActive === 'true';
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .populate({
        path: 'roleId',
        select: 'name description permissions'
      })
      .populate({
        path: 'createdBy',
        select: 'name email'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
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

    if (!checkPermission(session, 'users.create')) {
      return NextResponse.json(permissionDeniedResponse('users.create'), { status: 403 });
    }

    await connectDB();
    
    const body = await request.json();
    const { name, email, password, roleId, isActive = true } = body;
    
    if (!name || !email || !password || !roleId) {
      return NextResponse.json(
        { success: false, error: 'Name, email, password, and role are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email address already exists' },
        { status: 400 }
      );
    }

    const role = await Role.findById(roleId);
    if (!role || !role.isActive) {
      return NextResponse.json(
        { success: false, error: 'Invalid or inactive role' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      hashedPassword,
      roleId,
      isActive,
      createdBy: session.user.id
    });

    await newUser.save();

    await newUser.populate({
      path: 'roleId',
      select: 'name description permissions'
    });

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
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

    if (!checkPermission(session, 'users.update')) {
      return NextResponse.json(permissionDeniedResponse('users.update'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, roleId, isActive, password } = body;
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (session.user.id === userId && isActive === false) {
      return NextResponse.json(
        { success: false, error: 'Cannot deactivate your own account' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    
    if (name !== undefined) {
      updateData.name = name.trim();
    }
    
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        );
      }
      
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Email address already exists' },
          { status: 400 }
        );
      }
      
      updateData.email = email.toLowerCase().trim();
    }
    
    if (roleId !== undefined) {
      const role = await Role.findById(roleId);
      if (!role || !role.isActive) {
        return NextResponse.json(
          { success: false, error: 'Invalid or inactive role' },
          { status: 400 }
        );
      }
      updateData.roleId = roleId;
    }
    
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    
    if (password !== undefined && password !== '') {
      if (password.length < 8) {
        return NextResponse.json(
          { success: false, error: 'Password must be at least 8 characters long' },
          { status: 400 }
        );
      }
      
      updateData.hashedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).populate({
      path: 'roleId',
      select: 'name description permissions'
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
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

    if (!checkPermission(session, 'users.delete')) {
      return NextResponse.json(permissionDeniedResponse('users.delete'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (session.user.id === userId) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}