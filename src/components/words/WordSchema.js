import {string, object, setLocale, date, array} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

/*function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

const today= new Date();
const mindate = "1900-01-01T00:00:00.000Z"
*/

export let wordSchema = object().shape(
    {
        id: string(),
        word_language: string().required(),
        word_title: string().required().max(150),
        word_description: string().max(1000),
        word_examples: string().max(1000),
        word_type: array().of(
            string(),
        ),
        word_date: date()
        /*data_nascimento: date()
            .min(mindate,({min}) => `O campo deve ser posterior a ${formatDate(mindate)}`, )
            .max(today,({max}) =>`O campo deve ser anterior ao dia de hoje!`,)
            .typeError('O campo é obrigatório.')
            .required(),
        nome: string().required().max(50)*/
    }
)