import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectdb'
import Events from '@/schema/EventsSchema'
import Notifications from '@/schema/NotificationsSchema'
import RegistrationTemplate from '@/schema/RegistrationTemplateSchema'
import RegistrationSubmission from '@/schema/RegistrationSubmissionSchema'
import CompetitionResult from '@/schema/CompetitionResultSchema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions'

export async function GET() {
    const session = await getServerSession(authOptions) as UserSession | null
    if (!session) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        )
    }

    if (!checkPermission(session, 'dashboard.read')) {
        return NextResponse.json(permissionDeniedResponse('dashboard.read'), { status: 403 })
    }

    try {
        await connectDB()
        const EventsCount = await Events.countDocuments()
        const NotificationsCount = await Notifications.countDocuments()
        const RegistrationFormsCount = await RegistrationTemplate.countDocuments({active: true})
        const RegistrationSubmissionsCount = await RegistrationSubmission.countDocuments()
        const CompetitionResultsCount = await CompetitionResult.countDocuments()

        const stats = {
            events: EventsCount,
            notifications: NotificationsCount,
            registrations: RegistrationFormsCount,
            registrationResponses: RegistrationSubmissionsCount,
            competitionResults: CompetitionResultsCount,
        }

        return NextResponse.json(
            { success: true, stats },
            { status: 200 }
        )
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stats'
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        )
    }
}
