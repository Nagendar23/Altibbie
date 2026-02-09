"use client";

import {useState} from 'react';
export default function CapturePage(){
    const [form, setForm] = useState({
        title:"",
        content:"",
        type:"note",
        tags:"",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e:any)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    title:form.title,
                    content:form.content,
                    type:form.type,
                    tags:form.tags.split(",").map((t)=> t.trim()),
                }),
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            setSuccess(true);
            setForm({ title: "", content: "", type: "note", tags: "" });
        } catch (error) {
            console.error('Error saving knowledge:', error);
            setSuccess(false);
        } finally {
            setLoading(false);
        }

    };
    return(
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Capture Knowledge</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />

        <textarea
          name="content"
          placeholder="Write your thought..."
          value={form.content}
          onChange={handleChange}
          rows={6}
          className="w-full border rounded px-4 py-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        >
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="insight">Insight</option>
        </select>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {success && (
          <p className="text-green-600 text-sm">
            Saved. AI is processing in the background.
          </p>
        )}
      </form>
    </div>       
    )
}
