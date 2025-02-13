export default class UserEndpoint {
    private static readonly USER_CONTROLLER_NAME = 'User'
    public static readonly UserPagingEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/pagination`
    public static readonly DeleteEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/delete`
    public static readonly ActivateEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/activate`
    public static readonly DeActivateEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/de-activate`
    public static readonly DetailEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/detail`
    public static readonly CreateUserEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/create`
    public static readonly ListRecruiterEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/recruiters`

    private static readonly CANDIDATE_CONTROLLER_NAME = 'Candidate'
    public static readonly CandidatePagingEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/pagination`
    public static readonly CreateCandidateEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/create`
    public static readonly CandidateDetailEndpoint = `${UserEndpoint.CANDIDATE_CONTROLLER_NAME}/detail`
}
