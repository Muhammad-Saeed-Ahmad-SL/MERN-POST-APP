import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;
    // console.log(token, isCustomAuth, "Line no 7 form auth middleware");
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "somesecret");
      // console.log(decodedData, "Line no 12 form auth middleware");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // console.log(decodedData, "Line no 17 form auth middleware");
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
