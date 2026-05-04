import { DataSnapshot, get, remove, set, update, type DatabaseReference, type Query } from "firebase/database";

/* 
Если из firebase достать одну запись и проитерироваться по ней snapshot.forEach(),
то по итогу на каждой итерации при childSnapshot.val() будет возвращаться значение одного
свойства, поэтому при записи данных в массив на кажой итерации получится такое: 
[ 'User', '12345', '245c09d4-521e-4800-8b1d-36f2ba3434ee' ].

Поэтому я создал getOneElementFromDB(), и если достать одну запись и применить snapshot.val(),
то вернётся уже обычный js объект: 
{
  name: 'User',
  password: '12345',
  user_id: 'kfdlg-0932mkf'
}
*/

export async function getOneItem<T>(ref: DatabaseReference) {
  try {
    const snapshot: DataSnapshot = await get(ref);
    const data: T = snapshot.val();
    return data;
  } catch(e) {
    console.error(e);
  }
}

export async function getArrayItems<T>(ref: Query) {
  try {
    const snapshot: DataSnapshot = await get(ref);
    const dataArr: T[] = [];
    
    snapshot.forEach((childSnapshot) => {
      dataArr.push(childSnapshot.val());
    });
    
    return dataArr;

  } catch (e) {
    console.error('Ошибка:', e);
  }
}

export async function setItem<T>(ref: DatabaseReference, body: T) {
    try { 
        await set(ref, body);
    } catch(e) {
        throw new Error();
    }
}

export async function putItem(ref: DatabaseReference, body: object) {
  try {
    await update(ref, body);
  } catch(e) {
    throw new Error();
  }
}

export async function deleteItem(ref: DatabaseReference) {
    try {
        await remove(ref);
    } catch(e) {
        throw new Error();
    }
}