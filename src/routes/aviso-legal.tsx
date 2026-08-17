import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/Chrome";
import { email } from "@/lib/site-content";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({ meta: [{ title: "Información legal — Pablo León Studio" }] }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalPage tag="INFORMACIÓN LEGAL" title="Información legal">
      <p>
        Este sitio, accesible en pabloleonstudio.es, es la web de Pablo León Studio, con domicilio de actividad en Murcia, España. Para cualquier consulta puedes escribir a <a href={`mailto:${email}`}>{email}</a> o llamar al <a href="tel:+34697790219">697 790 219</a>. La web presenta servicios de diseño y desarrollo web, experiencias digitales, automatización, asistentes virtuales y soluciones NFC/QR.
      </p>
      <p>
        El acceso al sitio es gratuito y supone la aceptación de un uso responsable de sus contenidos. Los textos, diseños, código, animaciones y demás materiales son propiedad de Pablo León Studio o se utilizan con autorización; no pueden reproducirse o distribuirse sin consentimiento previo. La información comercial mostrada tiene carácter orientativo: el alcance, precio y plazo de cada proyecto se concretan por escrito antes de iniciar cualquier servicio. La relación con las personas usuarias se rige por la legislación española y, cuando corresponda, por los juzgados y tribunales competentes de Murcia.
      </p>
    </LegalPage>
  );
}
