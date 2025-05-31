import { firestore } from "@/config/firebase";
import { 
  collection, 
  setDoc, 
  getDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  deleteDoc, 
  serverTimestamp, 
  updateDoc, 
  arrayUnion,
  arrayRemove,
  increment,
  deleteField
} from "firebase/firestore";
import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {CartItemType, CartType} from "@/types";


type CreateCart = Pick<CartType, "items" | "userId" | "sessionId" | "expireAt"> 

interface GetCart {
  id?: string,
}

interface ItemCart {
  cartId?: string,
  itemId?: number,
}

interface IncrementItemInCart {
  cartId?: string,
  itemId?: number,
  quantity: number
}


const cartsRef = collection(firestore, "/carts");

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ["cart"],
  endpoints: (build) => ({

    getCart: build.query<CartType, GetCart>({
      queryFn: async ({id}) => {
        try {
          const cartSnap = await getDoc(doc(cartsRef, id));
          return { data: cartSnap.data() as CartType };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      },
      providesTags: ["cart"]
    }),
    createCart: build.mutation<void, CreateCart>({
      queryFn: async (arg) => {
        try {
          const itemsObj: {[k: string]: CartItemType} = {};
          arg.items.forEach(item => {
            itemsObj[item.bookId] = item;
          })
          const docId = String(arg.sessionId || arg.userId || "") 
          await setDoc(doc(cartsRef, docId ), {
            sessionId: arg.sessionId,
            userId: arg.userId || null,
            items: itemsObj,
            itemsId: arg.items.map(item => item.bookId),
            createdAt: serverTimestamp(),
            expireAt: arg.expireAt
          });
          return { data: undefined };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      },
      invalidatesTags: ["cart"]
    }),
    addItemToCart: build.mutation<void, ItemCart>({
      queryFn: async ({cartId, itemId}) => {
        try {
          const cartRef = doc(cartsRef, cartId);
          await updateDoc(cartRef, {
            [`items.${itemId}`]: {
              bookId: itemId,
              quantity: 1
            },
            itemsId: arrayUnion(itemId),
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      },
      invalidatesTags: ["cart"]
    }),
    removeItemFromCart: build.mutation<void, ItemCart>({
      queryFn: async ({cartId, itemId}) => {
        try {
          const cartRef = doc(cartsRef, cartId);
          await updateDoc(cartRef, {
            [`items.${itemId}`]: deleteField(),
            itemsId: arrayRemove(itemId),
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      },
      invalidatesTags: ["cart"]
    }),
    incrementItemInCart: build.mutation<void, IncrementItemInCart>({
      queryFn: async ({cartId, itemId, quantity}) => {
        try {
          const cartRef = doc(cartsRef, cartId);
          await updateDoc(cartRef, {
            [`items.${itemId}.quantity`]: increment(quantity),
            updatedAt: serverTimestamp(),
          });
          return { data: undefined };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      },
      invalidatesTags: ["cart"]
    }),
    deleteExpiredCart: build.mutation<void, void>({
      queryFn: async () => {
        try {
          const currentDate = Timestamp.fromDate(new Date());
          const expiredCartsQuery = query(cartsRef, where("expireAt", "<=", currentDate));
          const expiredCartsSnap = await getDocs(expiredCartsQuery);
          console.log(expiredCartsSnap);
          expiredCartsSnap.forEach(async (cartSnap) => {
            console.log(cartSnap.data());
            await deleteDoc(cartSnap.ref);
        })
          return { data: undefined };
        } catch (error) {
          console.error(error)
          return { error: error }
        }
      }
    }),

    
  }),
})

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useDeleteExpiredCartMutation,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useIncrementItemInCartMutation,
} = cartApi;