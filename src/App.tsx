import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router";
import { QueryProvider } from "./presentation/providers/query.provider";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
