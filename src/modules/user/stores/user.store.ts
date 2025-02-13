import { makeAutoObservable } from 'mobx'
import { PaginationResult } from '../../../shared/models/pagination'
import {
    CandidateForDetailRetrieveDTO,
    CandidateForPaginationRetrieveDTO,
    CandidatePaginatedSearchRequest
} from '../models/candidate.model'
import {
    UserForDetailRetrieveDTO,
    UserForPaginationRetrieveDTO,
    UserForRetrieveDTO,
    UserPaginatedSearchRequest
} from '../models/user.model'

class UserStore {
    private listRecruiter = [] as UserForRetrieveDTO[]

    // Detail
    userDetail = {} as UserForDetailRetrieveDTO
    candidateDetail = {} as CandidateForDetailRetrieveDTO

    // Pagination
    userPageResult = {} as PaginationResult<UserForPaginationRetrieveDTO>
    candidatePageResult = {} as PaginationResult<CandidateForPaginationRetrieveDTO>
    userPaginationSearchValue: UserPaginatedSearchRequest | undefined = undefined
    candidatePaginationSearchValue: CandidatePaginatedSearchRequest | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    get recruiterlist() {
        return this.listRecruiter.map(recruiter => ({
            value: recruiter.id as any,
            label: recruiter.personalInformation?.username!
        }))
    }

    setUserPageResult(userPageResult?: PaginationResult<UserForPaginationRetrieveDTO>) {
        this.userPageResult = userPageResult ?? {}
    }

    setUserDetail(userDetail?: UserForDetailRetrieveDTO) {
        this.userDetail = userDetail ?? ({} as UserForDetailRetrieveDTO)
    }

    setCandidatePageResult(candidatePageResult?: PaginationResult<CandidateForPaginationRetrieveDTO>) {
        this.candidatePageResult = candidatePageResult ?? {}
    }

    setListRecruiter(listRecruiter?: UserForRetrieveDTO[]) {
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
