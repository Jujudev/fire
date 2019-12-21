import * as firebase from 'firebase/app';

export class Company {
    uid : string;
    email: string;
    name: string;
    city: string;
    country: string;
    jobemail: string;
    isVerified: boolean;
    postalcode?: string;
}