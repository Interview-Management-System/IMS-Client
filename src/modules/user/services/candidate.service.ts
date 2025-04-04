import candidateApiService from '../../../api/services/candidate-api.service'
import { FormDataHelper } from '../../../shared/helpers/form/data/form-data.helper'
import NavigationHelper from '../../../shared/helpers/navigation.helper'
import { CandidateForCreateDTO } from '../models/candidate.model'
import userStore from '../stores/user.store'

class CandidateService {
    // private readonly signalRService = new SignalRService('/user-hub')

    constructor() {
        // this.setupSignalListerners()
    }

    async getCandidateListPaging() {
        const searchValue = userStore.candidatePaginationSearchValue
        const responseData = await candidateApiService.getCandidateListPaging(searchValue)

        userStore.setCandidatePageResult(responseData?.data)
    }

    async createCandidate(request: CandidateForCreateDTO) {
        const formData = FormDataHelper.buildFormData(request)
        const createSuccess = await candidateApiService.createCandidate(formData)

        if (createSuccess) {
            NavigationHelper.goBack()
        }
    }

    async getCandidateById(id: string) {
        const reponse = await candidateApiService.getCandidateById(id)
        userStore.setCandidateDetail(reponse.data!)
    }

    private setupSignalListerners() {
        const handlers: { [key: string]: () => void } = {
            UserDelete: () => this.getCandidateListPaging(),
            UserStatusChange: () => this.getCandidateListPaging()
        }

        // this.registerSignalHandlers(handlers)
    }
}

const candidateService = new CandidateService()
export default candidateService
