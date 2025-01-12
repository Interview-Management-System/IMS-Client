/* eslint-disable react-hooks/rules-of-hooks */
import { makeAutoObservable } from 'mobx'
import { userListTestData } from '../../../data/test/user-data.test'
import { PaginationResult } from '../../../shared/models/pagination'
import { UserForRetrieveDTO } from '../models/user.model'

class UserStore {
    userPageResult = {
        items: userListTestData,
        pageSize: 5,
        pageIndex: 1,
        totalRecords: userListTestData.length
    } as PaginationResult<UserForRetrieveDTO>

    userDetail = {} as UserForRetrieveDTO

    constructor() {
        makeAutoObservable(this)
    }

    setUserPageResult(userPageResult?: PaginationResult<UserForRetrieveDTO>) {
        this.userPageResult = userPageResult ?? {}
    }
}

const userStore = new UserStore()
export default userStore
