import Firebase from 'firebase';
import { db, createTimestamp, auth } from '../../config';

export default class Profile {

  constructor (
    public userId: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public created: Firebase.firestore.Timestamp | Date = createTimestamp(),
    public id: string = null
  ) { }

  static async dbProfile(id?: string): Promise<Profile> {
    let profileData;

    if (id) (profileData = await db.collection('profiles').doc(id).withConverter(this.profileConverter).get());
    else (profileData = await db.collection('profiles').where('userId', '==', auth.currentUser.uid).limit(1).withConverter(this.profileConverter).get());
  
    if (!profileData) return null;

    return id ? profileData.data() : profileData.docs[0].data()    
  }

  static profileConverter = {
    toFirestore: function(profile: Profile) {
      return {
        created: this.created, 
        username: this.username, 
        firstName: this.firstName, 
        lastName: this.lastName, 
        userId: this.userId 
      }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Profile(
          data.userId,
          data.firstName,
          data.lastName,
          data.username,
          data.created,
          snapshot.id
        );
    }
  }
}

