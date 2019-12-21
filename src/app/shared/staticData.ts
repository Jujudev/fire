
   export class StaticDataClass {
       static property: number = 10;

       static contracttypes: ContractType[] =  [
                                            {value: '', viewValue: 'Tous les contrats'},
                                            {value: 'cdi', viewValue: 'CDI'},
                                            {value: 'cdd', viewValue: 'CDD'},
                                            {value: 'stage', viewValue: 'Stage'},
                                         ];
       
       static cities: Region[] = [
                                    {value: '', viewValue: 'Toutes les régions'},
                                    {value: 'dakar', viewValue: 'Dakar'},
                                    {value: 'diourbel', viewValue: 'Diourbel'},
                                    {value: 'fatick', viewValue: 'Fatick'},
                                    {value: 'kaffrine', viewValue: 'Kaffrine'},
                                    {value: 'kaolack', viewValue: 'Kaolack'},
                                    {value: 'kedougou', viewValue: 'Kédougou'},
                                    {value: 'kolda', viewValue: 'Kolda'},
                                    {value: 'louga', viewValue: 'Louga'},
                                    {value: 'matam', viewValue: 'Matam'},
                                    {value: 'saint-louis', viewValue: 'Saint-Louis'},
                                    {value: 'sedhiou', viewValue: 'Sédhiou'},
                                    {value: 'tambacounda', viewValue: 'Tambacounda'},
                                    {value: 'thies', viewValue: 'Thiès'},
                                    {value: 'ziguinchor', viewValue: 'Ziguinchor'},
                                ];

        static jobcategories: Category[] = [
                                    {value: '', viewValue: 'Tous les secteurs'},
                                    {value: 'direction', viewValue: 'Direction'},
                                    {value: 'comptabilite', viewValue: 'Comptabilité'},
                                    {value: 'commerce', viewValue: 'Commerce'},
                                    {value: 'construction', viewValue: 'Construction'},
                                    {value: 'enseignement', viewValue: 'Enseignement'},
                                    {value: 'restauration', viewValue: 'Restauration'},
                                    {value: 'immobilier', viewValue: 'Immobilier'},
                                ];

       static customMethod() {}
    
    }

    export interface Category {
        value: string;
        viewValue: string;
    }
    export interface Region {
        value: string;
        viewValue: string;
    }
    export interface ContractType {
        value: string;
        viewValue: string;
    }