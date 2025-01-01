import { createClient } from '@/utils/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = await createClient();

  if (req.method === 'GET') {
    const { noteid } = req.query;

    // Ensure noteid is a string and convert it to a number
    const noteId = Array.isArray(noteid) ? noteid[0] : noteid;

    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('noteid', noteId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { note_id, body } = req.body;

    // Validate inputs
    if (typeof note_id !== 'number' || !body) {
      return res.status(400).json({ error: 'note_id must be a number and body is required' });
    }

    const { data, error } = await supabase
      .from('content')
      .insert([{ note_id, body }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
