unit uAgendaDeContatos;

// TRABALHO FINAL - AGENDA DE CONTATOS
// Por: Verena

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, Grids;

type

  { TfrmPrincipal }

  TfrmPrincipal = class(TForm)
    btnCadastrar: TButton;
    btnPeCelular: TButton;
    btnPeNome: TButton;
    btnMedia: TButton;
    btnMasculino: TButton;
    btnFeminino: TButton;
    edtPesquisa: TEdit;
    edtNome: TEdit;
    edtIdade: TEdit;
    edtCelular: TEdit;
    edtCidade: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    lblMedia: TLabel;
    lblPesquisar: TLabel;
    lblExNumero: TLabel;
    lblMsg: TLabel;
    lblNome: TLabel;
    lblIdade: TLabel;
    lblSexo: TLabel;
    lblCelular: TLabel;
    lblCidade: TLabel;
    mCadastrados: TMemo;
    rbMasculino: TRadioButton;
    rbFeminino: TRadioButton;
    sgCadastro: TStringGrid;
    procedure btnCadastrarClick(Sender: TObject);
    procedure btnMediaClick(Sender: TObject);
    procedure btnPeCelularClick(Sender: TObject);
    procedure btnPeNomeClick(Sender: TObject);
    procedure btnMasculinoClick(Sender: TObject);
    procedure btnFemininoClick(Sender: TObject);
    procedure edtPesquisaChange(Sender: TObject);
    procedure FormCreate(Sender: TObject);
  private

  public

  end;

var
  frmPrincipal: TfrmPrincipal;
  //Variavel que ira contar quantos cadastros você realizou. Iniciando com 0
  iContador: integer = 0;
  //Variaveis para armazenar os dados
  vetNome:array[1..5] of String;
  vetIdade:array[1..5] of Integer;
  vetSexo:array[1..5] of String;
  vetCelular:array[1..5] of String;
  vetCidade:array[1..5] of String;

implementation

{$R *.lfm}

{ TfrmPrincipal }

procedure TfrmPrincipal.FormCreate(Sender: TObject);
begin
     //Inicia o campo Memo "mCadastrados" com o numero de contatos cadastrados
     //salvos na variavel "iContador"
     mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');



end;


procedure TfrmPrincipal.btnCadastrarClick(Sender: TObject);
begin
  //Tratamento de erros
  //Verifica se os Campos estão vazios
  if edtNome.Text = '' then
     ShowMessage('Campo NOME não pode ser vazio!')
  else if edtIdade.Text = '' then
       ShowMessage('Campo IDADE não pode ser vazio!')
  else if edtCelular.Text = '' then
       ShowMessage('Campo CELULAR não pode ser vazio!')
  else if edtCidade.Text = '' then
       ShowMessage('Campo CIDADE não pode ser vazio!')
  //Verifica se idade é negativa
  else if StrToInt(edtIdade.Text) <= 0 then
       ShowMessage('Campo IDADE não pode ser menor que 0!')
  else if iContador >= 5 then   
       ShowMessage('Não é possivel cadastrar novos contatos! Limite maximo atingido.')
  else
    begin
      vetNome[iContador] := edtNome.Text;
      vetIdade[iContador] := StrToInt(edtIdade.Text);
      if rbMasculino.Checked then
         vetSexo[iContador] := 'Masculino'
      else
         vetSexo[iContador] := 'Feminino';

      vetCelular[iContador] := edtCelular.Text;
      vetCidade[iContador] := edtCidade.Text;
      iContador := iContador + 1;

      //Limpa os campos de texto preparando-os para novo cadastro
      edtNome.Text := '';
      edtIdade.Text := '';
      edtCelular.Text := '';
      edtCidade.Text := '';

      //Atualiza o Memo 'mCadastrados' com os ultimos dados inseridos
      mCadastrados.Lines.Clear;
      mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
      mCadastrados.Lines.Add('');
      mCadastrados.Lines.Add('Novo Cadastro');
      mCadastrados.Lines.Add('Nome: ' + vetNome[iContador-1]);
      mCadastrados.Lines.Add('Idade: ' + IntToStr(vetIdade[iContador-1]));
      mCadastrados.Lines.Add('Sexo: ' + vetSexo[iContador-1]);
      mCadastrados.Lines.Add('Celular: ' + vetCelular[iContador-1]);
      mCadastrados.Lines.Add('Cidade: ' + vetCidade[iContador-1]);

      //Atualiza StringGrid 'sgCadastro'
      sgCadastro.Cells[0,iContador]:= IntToStr(iContador);
      sgCadastro.Cells[1,iContador]:= vetNome[iContador-1];
      sgCadastro.Cells[2,iContador]:= IntToStr(vetIdade[iContador-1]);
      sgCadastro.Cells[3,iContador]:= vetSexo[iContador-1];
      sgCadastro.Cells[4,iContador]:= vetCelular[iContador-1];
      sgCadastro.Cells[5,iContador]:= vetCidade[iContador-1];

      //Mensagem de sucesso
      ShowMessage('Cadastro realizado!');

    end;
end;

procedure TfrmPrincipal.btnMediaClick(Sender: TObject);
var
  aux: integer;
  media: real = 0;
begin
  //Verifica se tem cadastros no sistema para efetuar o calculo da média
  if iContador = 0 then
    ShowMessage('Nenhum cadastro realizado para calcular a média!')
  else
    begin
      //
      for aux := 0 to iContador-1 do
         begin
           media := media + vetIdade[aux];
         end;
      //Limpa o Memo mCadastrados para exibir os dados encontrados
      mCadastrados.Lines.Clear;
      mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
      mCadastrados.Lines.Add('');
      mCadastrados.Lines.Add('Média de idades: ' + FloatToStr(media/iContador));
    end;
end;

procedure TfrmPrincipal.btnPeCelularClick(Sender: TObject);
var
  aux: integer;
  encontrado: Boolean = False;
begin
  if edtPesquisa.Text = '' then
     //Tratamento de erro caso o usuario deixe o campo vazio
     ShowMessage('Você precisa digitar um telefone no campo pesquisa!')
  else
     begin
       //Limpa o Memo mCadastrados para exibir os dados encontrados
       mCadastrados.Lines.Clear;
       mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
       mCadastrados.Lines.Add('');
       mCadastrados.Lines.Add('Pelo numero: ' + edtPesquisa.Text);

       for aux := 0 to 4 do
          begin
            if edtPesquisa.Text = vetCelular[aux] then
              begin
                encontrado := True;
                mCadastrados.Lines.Add('');
                mCadastrados.Lines.Add('Cadastro encontrado: ');
                mCadastrados.Lines.Add('  Nome: ' + vetNome[aux]);
                mCadastrados.Lines.Add('  Idade: ' + IntToStr(vetIdade[aux]));
                mCadastrados.Lines.Add('  Sexo: ' + vetSexo[aux]);
                mCadastrados.Lines.Add('  >> Celular: ' + vetCelular[aux]);   //Setinha '>>' pra destacar o filtro ^_^
                mCadastrados.Lines.Add('  Cidade: ' + vetCidade[aux]);
              end;
          end;
        if encontrado = false then
          begin
            //Exibe uma mensagem no Memo e Erro
            mCadastrados.Lines.Add('  Numero não encontrado!');
            ShowMessage('Numero não encontrado');
          end;
      end;

end;

procedure TfrmPrincipal.btnPeNomeClick(Sender: TObject);
var
  aux: integer;
  encontrado: Boolean = False;
begin
  if edtPesquisa.Text = '' then
     //Tratamento de erro caso o usuario deixe o campo vazio
     ShowMessage('Você precisa digitar um nome no campo pesquisa!')
  else 
     begin
       //Limpa o Memo mCadastrados para exibir os dados encontrados
       mCadastrados.Lines.Clear;
       mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
       mCadastrados.Lines.Add('');
       mCadastrados.Lines.Add('Pesquisando por: ' + edtPesquisa.Text);

       for aux := 0 to 4 do
          begin
            if edtPesquisa.Text = vetNome[aux] then
              begin
                encontrado := True; 
                mCadastrados.Lines.Add('');
                mCadastrados.Lines.Add('Cadastro encontrado: ');
                mCadastrados.Lines.Add('  >> Nome: ' + vetNome[aux]);   //Setinha '>>' pra destacar o filtro ^_^
                mCadastrados.Lines.Add('  Idade: ' + IntToStr(vetIdade[aux]));
                mCadastrados.Lines.Add('  Sexo: ' + vetSexo[aux]);
                mCadastrados.Lines.Add('  Celular: ' + vetCelular[aux]);
                mCadastrados.Lines.Add('  Cidade: ' + vetCidade[aux]);
              end;
          end;
        if encontrado = false then
          begin
            //Exibe uma mensagem no Memo e Erro
            mCadastrados.Lines.Add('  Nome não encontrado!');
            ShowMessage('Nome não encontrado');
          end;
      end;
end;

procedure TfrmPrincipal.btnMasculinoClick(Sender: TObject);
var
  aux: integer;
begin
    //Limpa o Memo mCadastrados para exibir os dados encontrados
    mCadastrados.Lines.Clear;
    mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
    mCadastrados.Lines.Add('');
    mCadastrados.Lines.Add('Exibindo contatos do sexo masculino: ');

    for aux := 0 to 4 do
      begin
        if vetSexo[aux] = 'Masculino' then
          begin
            mCadastrados.Lines.Add('');
            mCadastrados.Lines.Add('Cadastro encontrado: ');
            mCadastrados.Lines.Add('  Nome: ' + vetNome[aux]);
            mCadastrados.Lines.Add('  Idade: ' + IntToStr(vetIdade[aux]));
            mCadastrados.Lines.Add('  >> Sexo: ' + vetSexo[aux]);   //Setinha '>>' pra destacar o filtro ^_^
            mCadastrados.Lines.Add('  Celular: ' + vetCelular[aux]);
            mCadastrados.Lines.Add('  Cidade: ' + vetCidade[aux]);
          end;
      end;
end;

procedure TfrmPrincipal.btnFemininoClick(Sender: TObject);
var
  aux: integer;
begin
    //Limpa o Memo mCadastrados para exibir os dados encontrados
    mCadastrados.Lines.Clear;
    mCadastrados.Lines.Add('Contatos na Agenda: ' + IntToStr(iContador) + '/5');
    mCadastrados.Lines.Add('');
    mCadastrados.Lines.Add('Exibindo contatos do sexo feminino: ');

    for aux := 0 to 4 do
      begin
        if vetSexo[aux] = 'Feminino' then
          begin
            mCadastrados.Lines.Add('');
            mCadastrados.Lines.Add('Cadastro encontrado: ');
            mCadastrados.Lines.Add('  Nome: ' + vetNome[aux]);
            mCadastrados.Lines.Add('  Idade: ' + IntToStr(vetIdade[aux]));
            mCadastrados.Lines.Add('  >> Sexo: ' + vetSexo[aux]);   //Setinha '>>' pra destacar o filtro ^_^
            mCadastrados.Lines.Add('  Celular: ' + vetCelular[aux]);
            mCadastrados.Lines.Add('  Cidade: ' + vetCidade[aux]);
          end;
      end;
end;

procedure TfrmPrincipal.edtPesquisaChange(Sender: TObject);
begin

end;



end.

