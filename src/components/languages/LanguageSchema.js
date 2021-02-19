import {string, object, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

/*function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

const today= new Date();
const mindate = "1900-01-01T00:00:00.000Z"
*/

export let languageSchema = object().shape(
    {
        id: string(),
        language_title: string().required().max(150),
    }
)