import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

const errorToastDefaultProps: UseToastOptions = {
  title: 'Error',
  status: 'error',
  isClosable: true,
  duration: null,
  variant: 'left-accent',
  position: 'top',
};

/**
 * Wrap over Chakra UI's toast function to throw an error with some preset behaviors
 * @see {@link https://chakra-ui.com/docs/feedback/toast}
 */
export default function useErrorToast() {
  const toast = useToast();
  const showErrorToast = useCallback(
    (props: UseToastOptions, error: Error) => {
      console.error(error);
      if (!props.id || !toast.isActive(props.id)) {
        toast({
          ...errorToastDefaultProps,
          id: props.id,
          title: props.title,
          description: props.description || `Error message: "${error.message}"`,
        });
      }
    },
    [toast]
  );
  return showErrorToast;
}
