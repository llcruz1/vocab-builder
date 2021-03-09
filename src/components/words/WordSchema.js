import {string, object, setLocale, date, array, number} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

//function formatDate(date) {
 //   return new Date(date).toLocaleDateString()
//}

const today= new Date();

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
        word_created_at: date().default(today),
        word_reviewed_at: date().default(today),
        word_review_interval: number().default(1),
    }
)

export function getStatusWord(word_review_interval, word_reviewed_at){

    function getDifferenceInDays(date1, date2) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    
        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    const intervals = [1,3,7,15,30,60,120,220,365];

    if (word_review_interval > intervals.length) {
        word_review_interval = intervals.length
    }  

    const num_days  = intervals[word_review_interval-1]
    const diff_days = getDifferenceInDays(new Date(word_reviewed_at), today)
    
    let status = 'ok';

    if(diff_days > num_days){
        status = 'bad';
    }
    else if(diff_days > 0.8*num_days){
        status = 'alert'
    }

    return status;
}