import { Company } from './company.model';
import * as StaticData from 'src/app/shared/staticData';


export class Job {
    $id : string;
    title : string;
    description1 : string;
    description2: string;
    salary: number;
    publishDate : Date;
    city: string;
    country: string;
    contractType: string;
    companyId : number;
    companyName: string;
    email: string;
    category: string;
    keywordsbis?: {                                
        all : string,
        allcat : string,
        alltype: string,
        selectedcat: string,
        selectedtype: string
        selectedcattype: string
    }
    display? : boolean
}

export class UserJob {
    $id : string;
    userUid : string;
    jobUid : string;
    jobEmail : string;
    jobTitle : string;
    postDate : Date;
}
