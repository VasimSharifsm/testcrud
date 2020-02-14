export class Employee {
    

        EmpId : number
        EmpName:string;
        DateOfBirth :any;
        EmailId :string;
        Gender :string;
        Address:string;
        PinCode :string;
        isActive :boolean;
        public availability: Country; // refer to type Availability  below
        CountryID: number;
        CountryName: string;
    
}

export class Country {
        constructor(
            public CountryID1: string,
            public CountryName1: string
        ){}
    }