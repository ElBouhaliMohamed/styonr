export default async function issueTokenHandler(req, res) {

  const privateKey = process.env.CHEC_SECRET_KEY;
  const apiUrl = process.env.CHEC_API_URL;
  const customerId = req.query.customer_id;

  if(!customerId) {
    res.status(400).send('customer id is missing!');
  }

  const response = await fetch(
    `${apiUrl}/customers/${req.query.customer_id}/issue-token`, {
      method: 'post',
      headers: new Headers({
        'X-Authorization': privateKey
      })
    }
  )

  return res.status(200).json(await response.json());

}