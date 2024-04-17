import axios from "axios";
import { VideoModel, VideoDocument } from '../../models/video';
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
    },
    getCourseName: async (_: any, { email }: { email: string }) => {
        try {
            const videoDetails: VideoDocument | null = await VideoModel.findOne({ email });
    
            if (!videoDetails) {
                throw new Error('User not found');
            }
    
            const courseNames: string[] = videoDetails.courses.map(course => course.courseName);
    
            return courseNames.map(courseName => ({ courseNames:courseName  }));
        } catch (error) {
            console.error('Error fetching course names:', error);
            throw new Error('Error fetching course names');
        }
    }
}
export const resolvers = { queries }