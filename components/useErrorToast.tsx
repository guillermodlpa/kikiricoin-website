import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Error');
  const showErrorToast = useCallback(
    (id: string, error: Error) => {
      console.error(error);
      if (!id || !toast.isActive(id)) {
        toast({
          ...errorToastDefaultProps,
          id,
          title: t(id),
          description: `${t('errorMessage')}: "${error.message}"`,
        });
      }
    },
    [toast, t]
  );
  return showErrorToast;
}
