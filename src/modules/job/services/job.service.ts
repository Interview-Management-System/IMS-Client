import jobApiService from '../../../api/services/job-api.service'
import jobStore from '../../user/stores/job.store'

class JobService {
    async getJobListPaging() {
        const searchValue = jobStore.jobPaginationSearchValue
        const responseData = await jobApiService.getJobListPaging(searchValue)

        jobStore.setJobPageResult(responseData?.data)
    }
}

const jobService = new JobService()
export default jobService
