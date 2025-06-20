const detectionJson = {
    "evaluation": [
      "\\b(?:DS|devoir\\s(?:sur\\stable|surveillé(?:\\ssur\\s(?:le|la|les)\\schapitre\\s\\d+(?:\\s\\([^\\)]+\\))?)?|commun|blanc|écrit|oral|partiel|final|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année))\\b",
      "\\bdevoir\\s(?:surveillé)\\s(?:sur\\s(?:le|la|les)\\schapitre\\s\\d+(?:\\s\\([^\\)]+\\))?)\\b",
      "\\bdevoir\\s(?:à\\sfaire\\sen\\sclasse|en\\sclasse\\ssurveillé|sur\\stable|écrit|oral|noté|évalué|corrigé|important|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bdevoir\\s(?:noté|évalué|corrigé)\\s(?:en\\sclasse|surveillé|important|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bcomposition\\s(?:surveillée|notée|trimestrielle|semestrielle|écrite|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bcontrôle\\s|bcontrole\\s(?:sur\\stable|en\\sclasse|surveillé|continu|inopiné|écrit|oral|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bexamen\\s(?:sur\\stable|surveillé|en\\sclasse|blanc|final|écrit|oral|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bépreuve\\s(?:surveillée|sur\\stable|en\\sclasse|anticipée|terminale|écrite|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\btest\\s(?:surveillé|en\\sclasse|sur\\stable|de\\sconnaissances|de\\scompétences|écrit|oral|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bevaluation\\s|évaluation\\s(?:de|écrite|finale|sur|surveillée|sur\\stable|diagnostique|formative|écrite|orale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",      
      "\\binterrogation\\s(?:écrite|surveillée|surprise|courte|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bcontrole\\s|contrôle\\s(?:n|de|écrit|des\\sconnaissances|continu|inopiné|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bexamen\\s(?:partiel|final|de\\sfin\\sde\\ssemestre|de\\srattrapage|oral|écrit|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bépreuve\\s(?:écrite|orale|pratique|anticipée|terminale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\béval(?:uation)?\\s(?:continue|finale|formative|sommative|diagnostique|écrite|orale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bTP\\s(?:noté|évalué|pratique|en\\slaboratoire|écrit|oral|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bdictée\\s(?:préparée|non\\spréparée|notée|évaluée|surprise|écrite|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\brédaction\\s(?:notée|évaluée|surveillée|argumentative|écrite|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bdissertation\\s(?:philosophique|littéraire|historique|argumentative|écrite|orale|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bcommentaire\\s(?:de\\stexte|composé|littéraire|critique|écrit|oral|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\btest\\s(?:d'anglais|d'espagnol|d'allemand|de\\slangue)\\s(?:écrit|oral|de\\scompréhension|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\b(?:English|Spanish|German|French)\\s(?:writing|speaking|listening|reading)\\s(?:test|exam|assessment|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bprueba\\sde\\sespañol\\s(?:escrita|oral|de\\scomprensión|de\\sgramática|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bDeutschtest\\s(?:schriftlich|mündlich|Hörverstehen|Leseverstehen|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b"
    ],
    "homework": [
      "\\bDM\\b(?:\\s+\\w+){0,3}",
      "\\bdevoir\\s?maison\\b(?:\\s+\\w+){0,3}",
      "\\bdevoir\\s(?:à\\s(?:faire|la)\\s)?maison\\b(?:\\s+\\w+){0,3}",
      "\\bdevoir\\s(?:à\\sfaire\\sà\\sla\\smaison|à\\srendre|pour\\sla\\sprochaine\\sfois|écrit|oral|noté|évalué|corrigé|long|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bdevoir\\s(?:non\\ssurveillé|personnel|hebdomadaire|écrit|oral|noté|évalué|corrigé|long|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bdevoir\\s(?:noté|évalué|corrigé)\\s(?:à\\sla\\smaison|à\\srendre|long|écrit|oral|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\btravail\\s(?:à\\sla\\smaison|personnel|à\\srendre|de\\srecherche|écrit|oral|noté|évalué|corrigé|long|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bexercices?\\s(?:à\\sfaire\\schez\\ssoi|à\\srendre|supplémentaires|écrits|oraux|notés|évalués|corrigés|longs|finaux|partiels|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bprojet\\s(?:à\\sréaliser\\sà\\sla\\smaison|personnel|de\\sgroupe|long\\sterme|écrit|oral|noté|évalué|corrigé|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\brédaction\\s(?:à\\sla\\smaison|personnelle|créative|argumentative|écrite|orale|notée|évaluée|corrigée|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bcomposition\\s(?:à\\sla\\smaison|personnelle|littéraire|historique|écrite|orale|notée|évaluée|corrigée|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\brecherche\\s(?:personnelle|à\\sla\\smaison|documentaire|approfondie|écrite|orale|notée|évaluée|corrigée|finale|partielle|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bessai\\s(?:à\\srédiger\\schez\\ssoi|personnel|argumentatif|critique|écrit|oral|noté|évalué|corrigé|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b",
      "\\bexposé\\s(?:à\\spréparer\\sà\\sla\\smaison|personnel|oral|écrit|noté|évalué|corrigé|final|partiel|de\\sfin\\sde\\ssemestre|de\\srattrapage|de\\smi\\ssemestre|de\\smi\\strimestre|de\\sfin\\sd'année)\\b"
    ],
    "finaltask": [
      "\\b(?:tâche\\sfinale|final\\stask)\\b(?:\\s+\\w+){0,3}",
      "\\bprojet\\sfinal\\b(?:\\s+\\w+){0,3}",
      "\\bfinal\\s(?:task|project|assignment|presentation)\\b(?:\\s+\\w+){0,3}",
      "\\bultimate\\s(?:task|challenge|assignment)\\b(?:\\s+\\w+){0,3}",
      "\\bévaluation\\s(?:finale|sommative|globale)\\b(?:\\s+\\w+){0,3}",
      "\\b(?:tâche|projet|évaluation)\\s(?:de\\sfin\\sde)\\s(?:séquence|chapitre|unité|module|trimestre|semestre|année|cours|programme|cycle|étude|formation)\\b"
    ],
    "oral": [
      "\\b(?:présentation|presentation)\\b(?:\\s+\\w+){0,3}",
      "\\boral\\b(?:\\s+\\w+){0,3}",
      "\\bprésentation\\s?orale\\b(?:\\s+\\w+){0,3}",
      "\\bexposé\\s?oral\\b(?:\\s+\\w+){0,3}",
      "\\boral\\s?presentation\\b(?:\\s+\\w+){0,3}",
      "\\bsoutenance\\s?orale\\b(?:\\s+\\w+){0,3}",
      "\\boral\\s?defense\\b(?:\\s+\\w+){0,3}",
      "\\bplaidoirie\\b(?:\\s+\\w+){0,3}",
      "\\bdébat\\s?oral\\b(?:\\s+\\w+){0,3}",
      "\\boral\\s?exam\\b(?:\\s+\\w+){0,3}",
      "\\bexamen\\s?oral\\b(?:\\s+\\w+){0,3}",
      "\\bspeech\\b(?:\\s+\\w+){0,3}",
      "\\bdiscours\\b(?:\\s+\\w+){0,3}",
      "\\bpitch\\s?oral\\b(?:\\s+\\w+){0,3}",
      "\\bconférence\\s?orale\\b(?:\\s+\\w+){0,3}",
      "\\bcompte-rendu\\s?oral\\b(?:\\s+\\w+){0,3}"
    ],
    "sheets": [
      "\\bfaire\\s(?:une?|des|la|les)\\sfiche(?:s)?\\b(?:\\s+\\w+){0,3}",
      "\\bcréer\\s(?:une?|des|la|les)\\sfiche(?:s)?\\b(?:\\s+\\w+){0,3}",
      "\\brédiger\\s(?:une?|des|la|les)\\sfiche(?:s)?\\b(?:\\s+\\w+){0,3}",
      "\\bélaborer\\s(?:une?|des|la|les)\\sfiche(?:s)?\\b(?:\\s+\\w+){0,3}",
      "\\bpréparer\\s(?:une?|des|la|les)\\sfiche(?:s)?\\b(?:\\s+\\w+){0,3}",
      "\\bfiche\\s(?:de\\s(?:lecture|révision|synthèse|travail|mémorisation|étude|analyse|recherche|cours|programme|cycle|formation))\\b(?:\\s+\\w+){0,3}",
      "\\bfiche\\s(?:récapitulative|résumé|mnémotechnique|d'exercices|de\\srévision|de\\ssynthèse|de\\stravail|de\\smémorisation|d'étude|d'analyse|de\\srecherche|de\\scours|de\\sprogramme|de\\scycle|de\\sformation)\\b(?:\\s+\\w+){0,3}"
    ],
    "report": [
      "\\bcompte[-\\s]rendu\\s(?:de\\s(?:TP|travaux\\spratiques|lecture|expérience|stage|visite|projet|recherche|étude|travail\\sde\\sgroupe|analyse|observation|enquête|mission|activité|intervention|atelier|séance|cours|programme|cycle|formation))\\b",
      "\\brapport\\s(?:de\\s(?:stage|projet|recherche|laboratoire|expérience|étude|travail\\sde\\sgroupe|analyse|observation|enquête|mission|activité|intervention|atelier|séance|cours|programme|cycle|formation))\\b",
      "\\bcompte[-\\s]rendu\\s(?:de\\s(?:TP|travaux\\spratiques|lecture|expérience|stage|visite))\\b",
      "\\brapport\\s(?:de\\s(?:stage|projet|recherche|laboratoire|expérience))\\b",
      "\\banalyse\\sde\\sdocuments?\\s(?:historiques?|scientifiques?|littéraires?|économiques?)\\b",
      "\\banalyse\\sd'expérience\\s(?:scientifique|en\\slaboratoire|pratique)\\b",
      "\\brendu\\sfinal\\sde\\s(?:projet|recherche|étude|travail\\sde\\sgroupe)\\b"
    ],
    "reading": [
      "\\blecture\\s(?:analytique|critique|commentée|approfondie|guidée)\\b",
      "\\banalyse\\sde\\stexte\\s(?:littéraire|historique|philosophique|scientifique)\\b",
      "\\bétude\\sde\\stexte\\s(?:dirigée|approfondie|comparative|thématique)\\b",
      "\\bétude\\sd'(?:œuvre|ouvrage)\\s(?:intégrale|complète|littéraire|classique)\\b"
    ],
    "project": [
      "\\bprojet\\sde\\sgroupe\\s(?:collaboratif|interdisciplinaire|innovant|créatif)\\b",
      "\\bprojet\\spratique\\s(?:en\\s(?:sciences|technologie|arts|informatique))\\b",
      "\\bprojet\\sd'application\\s(?:des\\sconnaissances|pratique|théorique)\\b",
      "\\bprojet\\sde\\srecherche\\s(?:individuel|collectif|scientifique|documentaire)\\b"
    ],
    "analysis": [
      "\\bdissertation\\s(?:argumentative|comparative|critique|philosophique)\\b",
      "\\bessai\\s(?:argumentatif|critique|analytique|réflexif)\\b",
      "\\bexposé\\s(?:oral|écrit)\\s(?:analytique|critique|comparatif)\\b",
      "\\banalyse\\s(?:littéraire|historique|scientifique|comparative|textuelle)\\b",
      "\\blecture\\scritique\\s(?:d'article|d'ouvrage|de\\sdocument|de\\spresse)\\b"
    ],
    "practice": [
      "\\bexercice\\spratique\\s(?:en\\s(?:laboratoire|atelier|classe|terrain))\\b",
      "\\bmanip\\s|manipulation\\s\\notées\\s(?:en\\s(?:laboratoire|atelier|classe|salle\\sde\\sTP))\\b",
      "\\bTP\\s(?:de\\s(?:chimie|physique|biologie|informatique|SVT))\\b",
      "\\btravaux\\spratiques\\s(?:dirigés|en\\sgroupe|individuels|expérimentaux)\\b",
      "\\brapport\\sde\\s(?:TP|travaux\\spratiques|expérience|manipulation)\\b",
      "\\bséance\\sde\\s(?:travaux\\spratiques|manipulation|expérimentation)\\b"
    ]
  };

type DetectionJson = Record<string, string[]>;

const detectionData: DetectionJson = detectionJson;

export function detectCategory(text: string): string {
  const originalText = text;
  
  for (const category in detectionData) {
    for (const pattern of detectionData[category]) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(originalText)) {
        console.log(category);
        return category;
      }
    }
  }
  
  return "none";
}