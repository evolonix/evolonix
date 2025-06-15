import { Link, Route, Routes } from 'react-router';

import { FeatureCharacters } from '@evolonix/rick-and-morty-feature-characters';

export function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      <FeatureCharacters />
    </>
  );
}

export default App;
