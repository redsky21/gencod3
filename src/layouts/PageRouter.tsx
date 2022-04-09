import React, { lazy, Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const PageRouter = () => {
  const location = useLocation();

  const Page = useMemo(() => {
    console.log('location', location);
    const pageFilePath = location.pathname.replace(RegExp('^/'), '');
    console.log('pageFilePath:::', pageFilePath);
    const Page = lazy(async () => {
      let data: Promise<any> | null = null;
      try {
        console.log('data:::', data);
        data = await import(`@/pages/${pageFilePath}`);
        console.log('data:::', data);
      } catch (e: any) {
        if (/Loading chunk \d+ failed/.test(e.message)) {
          window.location.reload();
          return;
        }
      }
      return data;
    });
    return (
      <Suspense fallback={<>Loading...</>}>
        <Page />
      </Suspense>
    );
  }, [location]);

  return Page;
};

export default PageRouter;
