import { supabase } from "../../lib/supabaseClient";

export async function POST(request: Request) {
  const {
    hiring_party,
    contractor,
    song_title,
    type_of_work,
    delivery_deadline,
    deliverables,
    payment_amount,
    payment_method,
    due_date,
    royalty_waiver,
    copyright_owner,
    credit_name,
    jurisdiction,
    ipfs_cid,
  } = await request.json();

  try {
    const { data: supabaseData, error } = await supabase
      .from("work-for-hire")
      .insert([
        {
          hiring_party: hiring_party,
          contractor: contractor,
          song_title: song_title,
          type_of_work: type_of_work,
          delivery_deadline: delivery_deadline,
          deliverables: deliverables,
          payment_amount: payment_amount,
          payment_method: payment_method,
          due_date: due_date,
          royalty_waiver: royalty_waiver,
          copyright_owner: copyright_owner,
          credit_name: credit_name,
          jurisdiction: jurisdiction,
          ipfs_cid: ipfs_cid,
        },
      ]);

    if (error) {
      console.error("Error storing data in Supabase:", error);
    } else {
      console.log("Data stored in Supabase:", supabaseData);
    }

    return Response.json(supabaseData);
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
