import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/Chrome";
import { email } from "@/lib/site-content";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({ meta: [{ title: "Privacidad — Pablo León Studio" }] }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalPage tag="PRIVACIDAD" title="Privacidad">
      <p>
        Pablo León Studio, pabloleonstudio.es, con domicilio de actividad en Murcia, España, trata los datos que facilitas al contactar —nombre, correo electrónico, teléfono y mensaje— únicamente para responder a tu consulta, preparar una propuesta o gestionar la relación profesional que solicites. Puedes contactar en <a href={`mailto:${email}`}>{email}</a> o en el 697 790 219. La base del tratamiento es tu consentimiento al enviar el formulario y, si procede, las actuaciones necesarias para atender una solicitud o ejecutar un servicio.
      </p>
      <p>
        Los datos se conservan mientras sea necesario para atender la consulta y durante los plazos exigidos por la normativa aplicable. No se venden ni se ceden para fines comerciales. Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo al correo indicado, y presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento no se ajusta a la normativa vigente.
      </p>
    </LegalPage>
  );
}
