import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";


export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({

    getCart: build.query({
      queryFn: async () => {
       return
      }
    }),


  }),
})