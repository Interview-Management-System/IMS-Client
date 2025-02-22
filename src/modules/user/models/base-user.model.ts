export interface PersonalInformation {
    gender: boolean
    dob?: Date
    email?: string
    address?: string
    username?: string
    phoneNumber?: string
    avatarLink?: string
}

export interface UserStatus {
    isActive: boolean
    statusText?: string
}

export interface BaseUserDTO {
    note?: string
    personalInformation?: PersonalInformation
}
