const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx";
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx";
import { BookIndex } from "./apps/book/pages/BookIndex.jsx";
import { BookEdit } from "./apps/book/pages/BookEdit.jsx";
import { BookDetails} from "./apps/book/pages/BookDetails.jsx";
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/mail/compose/:mailId" element={<MailCompose />} />
          <Route path="/mail/details/:mailId" element={<MailDetails />} />
          <Route path="/note" element={<NoteIndex />} />
          <Route path="/books" element={<BookIndex />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/books/edit" element={<BookEdit />} />
          <Route path="/books/edit/:bookId" element={<BookEdit />} />
        </Routes>
      </section>
      <UserMsg />
    </Router>
  );
}
