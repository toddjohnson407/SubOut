// /* 
//  * This module is for methods that assist in 
//  * managing cached/local storage using AsyncStorage 
//  */

// import { AsyncStorage } from 'react-native';

// /** Retrieves local data using the key of the item */
// async function retrieveData(key: string): Promise<{ error: boolean, value: string }> {
//   let dataInfo = { error: false, value: null };
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value) dataInfo.value = hasJsonStructure(value) ? JSON.parse(value) : value;
//     return dataInfo;
//   } catch (error) {
//     console.log('Error retrieving data from local storage:', error)
//     dataInfo.error = true;
//     return dataInfo;
//   }
// };
// /** Stores data using the given key */
// async function storeData(key: string, data: string | Object): Promise<boolean> {
//   if (!(typeof data === 'object' || typeof data === 'string')) return false
//   try {
//     let dataValue: string = (typeof data === 'object') ? JSON.stringify(data) : data;
//     await AsyncStorage.setItem(key, dataValue);
//     return true;
//   } catch (error) {
//     console.log('Error saving data to local storage:', error);
//     return false
//   }
// };

// /** Retrieves all keys for locally stored data */
// async function allKeys(): Promise<string | string[]> {
//   try {
//     return await AsyncStorage.getAllKeys();
//   } catch (error) {
//     return 'Error retrieving local storage keys: ' + error;
//   }
// }

// async function removeAllKeysData(): Promise<boolean> {
//   try {
//     let keys = await allKeys();
//     if (typeof keys === 'string') return false
//     await AsyncStorage.multiRemove(keys);
//     return true
//   } catch (error) {
//     console.log('Error removing all local storage keys and related data:', error)
//     return false;
//   }
// }

// export { retrieveData, storeData, allKeys, removeAllKeysData }

// function hasJsonStructure(str: string) {
//   if (typeof str !== 'string') return false;
//   try {
//     const result = JSON.parse(str);
//     const type = Object.prototype.toString.call(result);
//     return type === '[object Object]' || type === '[object Array]';
//   } catch (err) {
//     return false;
//   }
// }
