
import { connect, model } from "mongoose";

const connectToMongoDB = async () => {
	try {
		const mongoUrl =
  "mongodb+srv://ravindersingh74123:ravindersingh74123@cluster0.kakucbp.mongodb.net/test4";

connect(mongoUrl, {
    useNewUrlParser: true,
  })
 
  
		
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;


