import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';


let userNow;
export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log(user);


  let { data: userdetails, error: err1 } = await supabase
    .from('userdetails')
    .select("*")
    .eq('email', user.email)
  console.log(err1);
  userNow = userdetails[0];



  let { data: book, error: err } = await supabase
    .from('book')
    .select('*')

  console.log(err);
  let tagsToBooksMap = {};
  book.forEach(currbook => {
    let values = currbook.tags.split(',');
    values.forEach(tag => {
      // Check if the tag already exists in the map
      if (!tagsToBooksMap[tag]) {
        tagsToBooksMap[tag] = []; // Initialize the array if the tag is encountered for the first time
      }
      // Add the book to the array associated with the tag
      // Assuming you're using the book's ID for identification; adjust as needed
      tagsToBooksMap[tag].push(currbook);
    });
  });





  return { book, tagsToBooksMap, userNow }
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export const actions = {
  upload: async ({ request, locals: { supabase, getSession } }) => {
    console.log("In backend to add book")
    const data = await request.formData();
    console.log("amar add book form holo", data);

    let newBook = Object.fromEntries(data.entries()) as any;

    let name = newBook.title + "_" + userNow.name;
    let name1 = newBook.title + "_img" + userNow.name;

    // //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

    const { data: res, error: err } = await supabase.storage
      .from('bookstore')
      .upload(name, newBook.content, {
        cacheControl: '3600',
        upsert: false
      });

    console.log("err:", err);

    const { data: link } = await supabase
      .storage
      .from('bookstore')
      .getPublicUrl(name)

    console.log(link);

    const { data: res1, error: err1 } = await supabase.storage
      .from('bookcover')
      .upload(name1, newBook.coverimg, {
        cacheControl: '3600',
        upsert: false
      });


    const { data: link1 } = await supabase
      .storage
      .from('bookcover')
      .getPublicUrl(name1)


    console.log("err:", err1);

    const { data: dt, error: err2 } = await supabase
      .from('book')
      .insert([
        { userid: userNow.id, title: newBook.title, author: newBook.author, edition: newBook.edition, coverimg: link1.publicUrl, tags: newBook.tags, content: link.publicUrl }
      ])


    console.log("err:", err2);


    throw redirect(303, '/protected/library');
  },
}