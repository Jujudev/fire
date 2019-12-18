import { Company } from './company.model';

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
}

export class UserJob {
    $id : string;
    userUid : string;
    jobUid : string;
    jobEmail : string;
    jobTitle : string;
    postDate : Date;
}
