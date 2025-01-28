/* eslint-disable react-hooks/rules-of-hooks */
import { makeAutoObservable } from 'mobx'
import { userListTestData } from '../../../data/test/user-data.test'
import { DepartmentEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PaginationResult } from '../../../shared/models/pagination'
import { UserForRetrieveDTO, UserPaginatedSearchRequest } from '../models/user.model'

class UserStore {
    userPageResult = {
        items: userListTestData,
        pageSize: 5,
        pageIndex: 1,
        totalRecords: userListTestData.length
    } as PaginationResult<UserForRetrieveDTO>

    userDetail = {
        id: '123e4567-e89b-12d3-a456-426614174000', // Example GUID as a string
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        dob: new Date('1990-01-01'), // Example Date object
        address: '123 Main St, Anytown, USA',
        phoneNumber: '1234567890',
        gender: 'Male',
        role: 'Developer',
        department: DepartmentEnum.Accounting.toString(),
        isActive: false,
        isDeleted: false,
        note: 'null',
        departmentId: DepartmentEnum.Accounting,
        statusText: 'null'
    } as UserForRetrieveDTO

    userPaginationSearchValue: UserPaginatedSearchRequest | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    setUserPageResult(userPageResult?: PaginationResult<UserForRetrieveDTO>) {
        this.userPageResult = userPageResult ?? {}
    }

    setUserDetail(userDetail?: UserForRetrieveDTO) {
        this.userDetail = userDetail ?? ({} as UserForRetrieveDTO)
    }

    /*
     For search values
    */
    setUserPaginationSearchValue(searchValue: UserPaginatedSearchRequest) {
        this.userPaginationSearchValue = searchValue
    }

    resetUserPaginationSearchValue() {
        this.userPaginationSearchValue = undefined
    }
}

const userStore = new UserStore()
export default userStore
