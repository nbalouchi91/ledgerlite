import { clients, invoices as seed } from '@/src/lib/sampleData';
import { invoiceSchema, newInvoiceSchema } from '@/src/lib/schemas';

const store = [...seed];

export async function GET() {
  return Response.json(store);
}

export async function POST(request: Request) {
  // Step 1: read the body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Step 2: validate the shape
  const result = newInvoiceSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`,
        ),
      },
      { status: 400 },
    );
  }

  // Step 3: business rule
  const clientExists = clients.some(
    (client) => client.id === result.data.clientId,
  );
  if (!clientExists) {
    return Response.json({ error: 'Unknown client.' }, { status: 400 });
  }

  // Step 4: build, store, respond
  const invoice = invoiceSchema.parse({
    ...result.data,
    id: crypto.randomUUID(),
    status: 'draft',
  });
  store.push(invoice);
  return Response.json(invoice, { status: 201 });
}
