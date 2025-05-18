import { makeAutoObservable } from 'mobx'
import { PaginationResult } from '../../../shared/models/pagination'
import {
    CandidateForDetailRetrieveDTO,
    CandidateForPaginationRetrieveDTO,
    CandidatePaginatedSearchRequest
} from '../models/candidate.model'
import {
    UserDetailRetrieveDTO,
    UserPaginatedSearchRequest,
    UserPaginationRetrieveDTO,
    UserRetrieveDTO
} from '../models/user.model'

class UserStore {
    private listRecruiter = [] as UserRetrieveDTO[]

    // Detail
    userDetail = {} as UserDetailRetrieveDTO
    candidateDetail = {} as CandidateForDetailRetrieveDTO

    // Pagination
    userPageResult = {} as PaginationResult<UserPaginationRetrieveDTO>
    candidatePageResult = {} as PaginationResult<CandidateForPaginationRetrieveDTO>
    userPaginationSearchValue: UserPaginatedSearchRequest | undefined = undefined
    candidatePaginationSearchValue: CandidatePaginatedSearchRequest | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    get recruiterlist() {
        return this.listRecruiter.map(recruiter => ({
            value: recruiter.id as any,
            label: recruiter.personalInformation?.username ?? ''
        }))
    }

    setUserPageResult(userPageResult?: PaginationResult<UserPaginationRetrieveDTO>) {
        this.userPageResult = userPageResult ?? {}
    }

    setUserDetail(userDetail?: UserDetailRetrieveDTO) {
        this.userDetail = userDetail ?? ({} as UserDetailRetrieveDTO)
    }

    setCandidatePageResult(candidatePageResult?: PaginationResult<CandidateForPaginationRetrieveDTO>) {
        this.candidatePageResult = candidatePageResult ?? {}
    }

    setListRecruiter(listRecruiter?: UserRetrieveDTO[]) {
        this.listRecruiter = listRecruiter ?? []
    }

    setCandidateDetail(candidateDetail: CandidateForDetailRetrieveDTO) {
        this.candidateDetail = candidateDetail
    }

    /*
     For search values
    */

    // User
    setUserPaginationSearchValue(searchValue: UserPaginatedSearchRequest) {
        this.userPaginationSearchValue = searchValue
    }

    resetUserPaginationSearchValue() {
        this.userPaginationSearchValue = undefined
    }

    // Candidate
    setCandidatePaginationSearchValue(searchValue: CandidatePaginatedSearchRequest) {
        this.candidatePaginationSearchValue = searchValue
    }

    resetCandidatePaginationSearchValue() {
        this.candidatePaginationSearchValue = undefined
    }
}

const userStore = new UserStore()
export default userStore
