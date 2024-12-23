export interface BasicInfo {
  surname: string;
  lastname: string;
  career: string;
  email: string;
  dob: string;
  address: string;
  phonenumber: string;
  martial: string;
}

export interface Skill {
  name: string;
  percent: number;
}

export interface Expertise {
  name: string;
  proficiency: string;
}

export interface Education {
  academic: string;
  school: string;
  major: string;
  year: string;
}

export interface Experience {
  position: string;
  company: string;
  year: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Reference {
  name: string;
  career: string;
  company: string;
  email: string;
  phonenumber: string;
}

export interface Portfolio {
  name: string;
  url: string;
}

export interface Certificate {
  url: string;
}

export interface Descriptions {
  description: string;
  strength: string;
}

export interface UserDetail {
  _id: string;
  userId: string;
  basic: BasicInfo;
  skills: Skill[];
  expertise: Expertise[];
  educations: Education[];
  experiences: Experience[];
  languages: Language[];
  references: Reference[];
  portfolio: Portfolio[];
  certificates: Certificate[];
  descriptions: Descriptions;
  cv: string;
}