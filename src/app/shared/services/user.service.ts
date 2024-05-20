import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../modal/user.modal';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private CollectionName = 'users';

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * Save user
   * @param {User} user
   * @return {*}
   * @memberof UserService
   */
  saveUser(user: User): Observable<User> {
    const newPromise = this.firestore.collection(this.CollectionName).add(user);
    return from(newPromise);
  }

  /**
   *
   * gey all user list data
   * @return {*}
   * @memberof UserService
   */
  getAllUsers(): Observable<User[]> {
    return this.firestore
      .collection(this.CollectionName)
      .snapshotChanges()
      .pipe(
        map((users) =>
          users.map((user) => {
            const id = user.payload.doc.id;
            const data = user.payload.doc.data() as User;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Update user
   * @param {string} userId
   * @param {User} user
   * @return {Promise<void>}
   */
  updateUser(userId: string, user: User): Observable<void> {
    const updatePromise = this.firestore
      .collection(this.CollectionName)
      .doc(userId)
      .set(user, { merge: true });
    return from(updatePromise);
  }

  /**
   * Delete user
   * @param {string} userId
   * @return {Promise<void>}
   */
  deleteUser(userId: string): Observable<void> {
    const deletedPromise = this.firestore
      .collection(this.CollectionName)
      .doc(userId)
      .delete();
    return from(deletedPromise);
  }

  /**
   * Get user by Id
   * @param {string} userId
   * @return {Observable<any>}
   */
  getUserById(userId: string): Observable<any> {
    return this.firestore
      .collection<User>(this.CollectionName)
      .doc(userId)
      .valueChanges();
  }
}
