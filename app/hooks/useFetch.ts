import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  UseQueryOptions, 
  UseMutationOptions, 
  QueryKey 
} from "@tanstack/react-query";

export const useApiGet = <TData, TError>(
  key: QueryKey, 
  fn: () => Promise<TData>, 
  options?: UseQueryOptions<TData, TError>
) => useQuery<TData, TError>({
  queryKey: key,
  queryFn: fn,
  ...options
});

// Type definition for useApiSend
export const useApiSend = <TData, TError, TVariables>(
  fn: (variables: TVariables) => Promise<TData>, 
  success?: (data: TData) => void, 
  error?: (error: TError) => void, 
  invalidateKeys?: QueryKey[], 
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    onSuccess: (data) => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (success) success(data);
    },
    onError: error,
    retry: 2,
    ...options, 
  });
};
