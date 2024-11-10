export interface UserLoginRequest {
    email?: string | undefined
    password?: string | undefined
}

export interface ForgetPasswordRequest {
    email?: string
}

export interface ResetPasswordRequest {
    email?: string
    token?: string
    newPassword?: string
    confirmPassword?: string
}
