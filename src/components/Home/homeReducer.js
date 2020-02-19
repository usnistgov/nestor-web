import { GET_HOME, UPDATE_HOME } from "./homeAction";
export default function homeReducer(state = "", { type, payload })
{
    switch (type)
    {
        case GET_HOME:
            return payload.home;
        case UPDATE_HOME:
            return payload.home;
        default:
            return state;
    }
}
