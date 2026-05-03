import { getIronSession, IronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
    isLoggedIn: boolean
    email?: string
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET ?? 'zawaya-admin-session-secret-32-chars!!',
    cookieName: 'zawaya_admin_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
}

export async function getSession(): Promise<IronSession<SessionData>> {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}
