import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.database();
const firestore = admin.firestore();

export const marcarFaltasAgendada = functions.pubsub
  .schedule("0 23 * * 1-5") // Segunda a sexta às 23h00
  .timeZone("America/Sao_Paulo")
  .onRun(async (context) => {
    const agora = new Date();

    // Pega o dia anterior
    const ontem = new Date(agora);
    ontem.setDate(agora.getDate() - 1);

    // Gera YYYY-MM-DD em horário local
    const formatLocalDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const idDia = formatLocalDate(ontem); // ✅ agora é o dia 12
    const diaSemana = ontem.getDay(); // 0 = domingo, 6 = sábado

    if (diaSemana === 0 || diaSemana === 6) {
      console.log("Ontem foi fim de semana, nenhuma falta será marcada.");
      return null;
    }

    const dateDisplay = ontem.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    try {
      const colaboradoresSnap = await firestore.collection("colaboradores").get();
      const updates: Record<string, any> = {};
      const faltantes: string[] = [];

      for (const doc of colaboradoresSnap.docs) {
        const idUser = doc.id;
        const dados = doc.data();
        const regime = dados.workSchedule || "Escritório 08h às 18h";

        const registroRef = db.ref(`controlePonto/${idUser}/registros/${idDia}`);
        const registroSnap = await registroRef.once("value");

        if (registroSnap.exists()) {
          continue; // já tem registro para o dia
        }

        const userRef = db.ref(`controlePonto/${idUser}`);
        const userSnap = await userRef.once("value");

        const path = `controlePonto/${idUser}/registros/${idDia}`;
        updates[path] = {
          checkIn: "",
          breakStart: "",
          breakEnd: "",
          checkOut: "",
          date: dateDisplay,
          id: idDia,
          idUser,
          workSchedule: regime,
          totalWorked: "",
          timeBank: "",
          status: "faltou",
          justificativa: "",
          hasJustificativa: false,
        };

        if (!userSnap.exists()) {
          updates[`controlePonto/${idUser}/idUser`] = idUser;
        }

        faltantes.push(idUser);
      }

      await db.ref().update(updates);
      console.log(`Faltas marcadas para o dia ${idDia}: ${faltantes.join(", ")}`);
      return null;
    } catch (error) {
      console.error("Erro ao executar rotina de faltas:", error);
      return null;
    }
  });


