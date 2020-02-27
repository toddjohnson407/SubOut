import Firebase from 'firebase';
import { db, auth, storage, createTimestamp } from '../../config';

export default class Profile {

  constructor (
    public userId: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public created: Firebase.firestore.Timestamp | Date = createTimestamp()
  ) { }

  get dbFormat(): any {
    return {
      created: this.created, 
      username: this.username, 
      firstName: this.firstName, 
      lastName: this.lastName, 
      userId: this.userId 
    };
  }

  createProfile() {
    db.collection('profiles').doc().set(this.dbFormat).then(res => {
      console.log('Profile Created');
    }).catch(err => console.log('Error creating profile:', err));
  }

}