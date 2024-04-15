import axios from "axios";
const queries = {
    getIsCreator: async (_: any, { email }: { email: string }) => {
        try {
            const response = await axios.post('http://localhost:9063/api/getuserdetails', {
                email: email
            });
           return response.data
        } catch (error) {
            console.error('Error fetching isCreator:', error);
            throw new Error('Error fetching isCreator');
        }
    }
}
export const resolvers = { queries }