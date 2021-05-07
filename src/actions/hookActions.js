import axios from 'axios';

export const getSecretWord = async (setSecretWord, setServerError) => {
  try {
    const response = await axios.get('http://localhost:3030');
    setSecretWord(response.data);
  } catch (e) {
    setServerError(true);
  }

}

export default {
  getSecretWord
}
