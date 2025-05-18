export default class UserEndpoint {
    private static readonly CANDIDATE_CONTROLLER_NAME = 'Candidate'
    public static readonly CandidatePagingEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/pagination`
    public static readonly CreateCandidateEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/create`
    public static readonly CandidateDetailEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/detail`
}
